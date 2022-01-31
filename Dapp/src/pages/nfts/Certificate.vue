<template>
	<q-page>
		<div id="fundo" class="flex flex-center">
			<div id="nft" class="content-center">
				<div id="row1" class="linha">
					<div class="col">{{ text.student }}</div>
				</div>
				<div id="row2" class="linha">{{ text.account }}</div>
				<div id="row3" class="linha">{{ text.courseName }}</div>

				<div id="row4" class="linha">{{ text.courseID }}</div>
				<div id="row5" class="linha">{{ text.nftDate }}</div>
				<div id="row6" class="linha">{{ text.nftUrl }}</div>
			</div>
			<!--	<img
				src="https://ipfs.moralis.io:2053/ipfs/QmaEZhJrBGZHcf42fAusLzDiNmTA3peVWYwuYDZ3o39ySE"
				alt="teste"
			/>  -->
		</div>
	</q-page>
</template>

<script>
import domtoimage from "dom-to-image";
import dataText from "src/data/samples/nft_certificate.json";

export default {
	name: "nft-generator",
	data() {
		return {
			text: dataText,
		};
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

			console.log(image);
			const file = new this.$moralis.File("image.png", { base64: image });
			await file.saveIPFS();

			console.log(file.ipfs());
			console.log(file.url());
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
	width: 100vw;
	height: 100vh;
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
	background-image: url("/img/fundo3.png");
	background-size: contain;
	background-repeat: no-repeat;
	letter-spacing: 1px;
}

#row1 {
	padding-top: 270px;
	font-family: Gilroy;

	font-size: 40px;
	font-weight: 100;
}

#row2 {
	margin-top: -5px;
	font-size: 12px;
}

#row3 {
	margin-top: 55px;
	font-family: Gilroy;
	font-size: 40px;
}

#row4 {
	margin-top: -5px;

	font-size: 14px;
}

#row5 {
	margin-top: 30px;
	font-size: 14px;
}

#row6 {
	font-size: 14px;
}
</style>
