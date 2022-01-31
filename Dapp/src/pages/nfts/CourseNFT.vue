<template>
	<q-page>
		<div id="fundo" class="flex flex-center">
			<div id="nft" class="content-center">
				<div id="row1" class="linha">
					<div class="col">{{ dataText.courseOwner }}</div>
				</div>
				<div id="row2" class="linha">{{ dataText.account }}</div>
				<div id="row3" class="linha">{{ dataText.courseName }}</div>
				<div id="row4" class="linha">{{ dataText.courseID }}</div>
				<div id="row5" class="linha">{{ dataText.description }}</div>
				<div id="row6" class="linha">{{ dataText.nftDate }}</div>
				<div id="row7" class="linha">{{ dataText.nftUrl }}</div>
			</div>
		</div>
	</q-page>
</template>

<script>
import domtoimage from "dom-to-image";
//import dataText from "src/data/samples/nft_course.json";

export default {
	name: "nft-generator",
	props: {
		dataText: {
			type: Object,
			required: true,
		},
	},
	methods: {
		async generateNftFile() {
			var node = document.getElementById("nft");

			const image = await domtoimage
				.toPng(node)
				.then(function (dataUrl) {
					var img = new Image();
					img.src = dataUrl;
					//document.body.appendChild(img);
					return dataUrl.split(";base64,")[1];
				})
				.catch(function (error) {
					console.error("oops, something went wrong!", error);
				});

			const file = new this.$moralis.File("image.png", { base64: image });
			await file.saveIPFS();

			this.$emit("nftMinted", file.ipfs());
		},
	},
	mounted() {
		this.generateNftFile();
	},
};
</script>

<style>
@font-face {
	font-family: Gilroy;
	src: url(src/css/fonts/gilroyextrabold.otf);
}
@font-face {
	font-family: Gilroy Light;
	src: url(src/css/fonts/gilroy-light.otf);
}

.linha {
	width: 100%;
	text-align: center;
}

#fundo {
	width: 100%;
	min-width: 1023px;

	background-color: black;
}

#nft {
	margin: 0;
	padding: 0;
	width: 1023px;
	height: 700px;
	border-style: none;
	font-family: Gilroy Light;
	color: white;
	background-image: url("/dapp/img/fundo.png");
	background-size: contain;
	background-repeat: no-repeat;
	letter-spacing: 1px;
}

#row1 {
	padding-top: 240px;
	font-family: Gilroy;

	font-size: 30px;
	font-weight: 100;
}

#row2 {
	margin-top: -5px;
	font-size: 14px;
}

#row3 {
	margin-top: 70px;
	font-family: Gilroy;
	font-size: 30px;
}

#row4 {
	margin-top: -5px;

	font-size: 14px;
}

#row5 {
	margin-top: 1 0px;
	font-size: 14px;
}
#row6 {
	font-size: 14px;
}
#row7 {
	font-size: 10px;
}
</style>
