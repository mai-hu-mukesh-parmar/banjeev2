import React from "react";
import { Skeleton, VStack, Center, HStack } from "native-base";

function FeedSkeleton(props) {
	return (
		<Center w="100%">
			<VStack
				w="95%"
				maxW="400"
				borderWidth="1"
				space={8}
				overflow="hidden"
				rounded="md"
				_dark={{
					borderColor: "coolGray.500",
				}}
				_light={{
					borderColor: "coolGray.200",
				}}
			>
				<HStack my="3" width="100%">
					<Skeleton style={{ marginLeft: 5 }} rounded={80} width="13%" />
					<VStack mx="3" width="80%" style={{ alignItems: "center" }}>
						<Skeleton
							rounded="5"
							style={{ marginBottom: "5%", marginTop: "1%" }}
							height="4"
							width="100%"
						/>
						<Skeleton rounded="5" height="2" width="100%" />
					</VStack>
				</HStack>
				<Skeleton
					h="320"
					w="95%"
					style={{ alignSelf: "center", marginTop: "-5%" }}
				/>
			</VStack>
			<VStack
				my={5}
				w="95%"
				maxW="400"
				borderWidth="1"
				space={8}
				overflow="hidden"
				rounded="md"
				_dark={{
					borderColor: "coolGray.500",
				}}
				_light={{
					borderColor: "coolGray.200",
				}}
			>
				<HStack my="3" width="100%">
					<Skeleton style={{ marginLeft: 5 }} rounded={80} width="13%" />
					<VStack mx="3" width="80%" style={{ alignItems: "center" }}>
						<Skeleton
							rounded="5"
							style={{ marginBottom: "5%", marginTop: "1%" }}
							height="4"
							width="100%"
						/>
						<Skeleton rounded="5" height="2" width="100%" />
					</VStack>
				</HStack>
				<Skeleton
					h="320"
					w="95%"
					style={{ alignSelf: "center", marginTop: "-5%" }}
				/>
			</VStack>
		</Center>
	);
}

export default FeedSkeleton;
