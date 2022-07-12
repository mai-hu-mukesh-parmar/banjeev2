export const profileUrl = (id) => {
	// requires avtarUrl
	if (id) {
		return `https://gateway.banjee.org/services/media-service/iwantcdn/resources/${id}?actionCode=ACTION_DOWNLOAD_RESOURCE`;
	}
};

export const listProfileUrl = (id) => {
	// requires systemUserId
	return (
		"https://gateway.banjee.org/services/media-service/iwantcdn/user/" + id
	);
};

export const cloudinaryFeedUrl = (src, type) => {
	if (src && type) {
		switch (type) {
			case "image":
				return `https://res.cloudinary.com/banjee/image/upload/ar_1:1,c_pad,f_auto,q_auto:low/v1/${src}.webp`;
			case "video":
				return `https://res.cloudinary.com/banjee/video/upload/br_128,q_auto:low/v1/${src}.mp4`;
			case "audio":
				return `https://res.cloudinary.com/banjee/video/upload/br_128,q_auto:low/v1/${src}.mp3`;
			default:
				return `https://res.cloudinary.com/banjee/image/upload/ar_1:1,c_pad,f_auto,q_auto:low/v1/${src}.webp`;
		}
	}
};

export const checkGender = (gender) => {
	let maleImg = require("../../../assets/EditDrawerIcon/male_placeholder.png");
	let femaleImg = require("../../../assets/EditDrawerIcon/female_placeholder.png");
	let neutralImg = require("../../../assets/EditDrawerIcon/neutral_placeholder.png");
	if (gender === "Male") return maleImg;
	else if (gender === "Female") return femaleImg;
	else return neutralImg;
};
