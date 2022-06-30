import React from "react";
import { Platform } from "react-native";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { cloudinaryFeedUrl } from "../util-func/constantExport";

function usePlayPauseAudio(voiceIntroSrc, doNotPlayOnLoad) {
	const { addListener } = useNavigation();

	const [icons, setIcons] = React.useState("play");
	const [player] = React.useState(new Audio.Sound());

	const stopPlayer = React.useCallback(async () => {
		setIcons("play");
		await player.unloadAsync();
	}, [player]);

	const loadSound = React.useCallback(async () => {
		const audio = voiceIntroSrc
			? cloudinaryFeedUrl(voiceIntroSrc, "audio")
			: null;

		console.log("voiceintro", voiceIntroSrc, "audio", audio);

		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			playsInSilentModeIOS: false,
		});

		player
			.loadAsync(
				{
					uri: audio,
				},
				Platform.OS === "ios" ? true : false
			)
			.then(async (res) => {
				if (res.isLoaded) {
					await playSoundFunc();
				}
			})
			.catch((err) => {
				console.warn(err);
			});
	}, [voiceIntroSrc, player]);

	const playSoundFunc = React.useCallback(async () => {
		setIcons("pause");
		const result = await player.getStatusAsync();
		if (result.isLoaded) {
			if (result.isPlaying === false) {
				player.playAsync().then((res) => {
					setTimeout(async () => {
						await stopPlayer();
					}, res.durationMillis);
				});
			} else {
				await stopPlayer();
			}
		}
	}, [player, stopPlayer]);

	const playAudio = React.useCallback(async () => {
		const result = await player.getStatusAsync();
		if (!result.isLoaded) {
			await loadSound();
		} else {
			await playSoundFunc();
		}
	}, [loadSound, playSoundFunc]);

	React.useEffect(() => {
		addListener("focus", async () => {
			if (voiceIntroSrc && !doNotPlayOnLoad) {
				await loadSound();
			}
		});
		async () => {
			await stopPlayer();
			setIcons("play");
		};
	}, [loadSound, addListener, doNotPlayOnLoad, voiceIntroSrc, stopPlayer]);

	return { playAudio, stopPlayer, icons };
}

export default usePlayPauseAudio;
