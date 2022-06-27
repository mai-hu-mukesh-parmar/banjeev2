export const uploadToCloudinaryFunc = async (source, mime, mediaAssets) => {
	const uploadData = new FormData();
	uploadData.append("file", source);
	uploadData.append("cloud_name", "banjee");
	// uploadData.append("resource_type", mime);
	uploadData.append("upload_preset", mediaAssets);
	const d = await fetch(
		`https://api.cloudinary.com/v1_1/banjee/${mime}/upload`,
		{
			method: "post",
			body: uploadData,
		}
	);
	return d;
};

export const returnSource = (result) => {
	const uri = result.uri;
	const type = `${result.type}/${
		result.uri.split(".")[result.uri.split(".").length - 1]
	}`;
	const name = result.uri.split("/")[result.uri.split("/").length - 1];
	const source = {
		uri,
		type,
		mimeType: type,
		name,
	};
	return source;
};
