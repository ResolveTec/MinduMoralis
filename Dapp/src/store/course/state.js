export default function () {
	return {
		courseObject: {
			ID: 0,
			UID: 0,
			type: null,
			meta: {
				title: "",
				subtitle: null,
				teacher_ID: [],
			},
			metrics: {
				tag: [],
				progress: null,
				progress_info: null,
			},
			media: {
				imageURL: null,
				videoURL: null,
			},
			cart: {
				col: "",
				value: 0,
			},
			status: 0,
			description: "",
		},
	};
}
