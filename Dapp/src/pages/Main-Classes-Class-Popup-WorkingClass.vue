<template> 

	<q-card-section class="row flex flex-center items-center content-center justify-center full-width q-px-xl q-py-lg">   
        <div class="row q-pl-xl inline-block flex-break">
			<div class="row text-h5">Aula 11 - Trabalhar Junto</div>
        </div>
        
        <mainVideoPlayer src="https://www.youtube.com/embed/BP5pYCpcM0s" />
        
    </q-card-section>
    
    <q-card-section class="flex flex-center items-center content-center justify-center full-width q-px-xl q-py-lg">   
        <div class="workingClassArea">
	        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
			<div class="row text-h6 q-py-lg">Lorem ipsum dolor</div>        
	        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At in tellus integer feugiat scelerisque varius morbi. Phasellus faucibus scelerisque eleifend donec pretium vulputate. Ut consequat semper viverra nam libero. Sit amet risus nullam eget felis eget nunc lobortis. Eget nunc scelerisque viverra mauris in. Non sodales neque sodales ut etiam sit amet nisl. Nibh sit amet commodo nulla facilisi nullam vehicula. Malesuada fames ac turpis egestas maecenas pharetra convallis. Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Aenean sed adipiscing diam donec adipiscing tristique. Tempor commodo ullamcorper a lacus vestibulum. A iaculis at erat pellentesque adipiscing. Etiam sit amet nisl purus in mollis nunc sed. Velit dignissim sodales ut eu sem integer vitae. Nunc id cursus metus aliquam eleifend. Vitae congue eu consequat ac felis donec et. Id diam vel quam elementum pulvinar. Duis at tellus at urna condimentum. Cursus sit amet dictum sit amet justo. Nulla at volutpat diam ut venenatis tellus. In massa tempor nec feugiat nisl pretium fusce id. Nibh ipsum consequat nisl vel pretium lectus quam. Sit amet nisl purus in. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Risus quis varius quam quisque id diam vel. Quis ipsum suspendisse ultrices gravida. Vitae congue eu consequat ac felis donec et. Orci eu lobortis elementum nibh tellus molestie nunc non. Gravida quis blandit turpis cursus in. Eget duis at tellus at urna condimentum. In ante metus dictum at.</div>
	        <div class="row text-h6 q-pt-lg">Materiais complementares</div>
	    </div>
    </q-card-section>
    
    <q-card-section class="flex flex-center items-center content-center justify-center full-width q-px-xl q-py-none">   
        <div class="row workingClassArea rounded bg-grey-10">
            <div class="row flex-center items-center content-center justify-center full-width q-pa-lg">
                <div class="col-auto float-left q-pr-xl">
                    <q-img :src="'img/expico1.png'" class="cardImg roundedSmallCorners" />
                </div>
                <div class="col-4 text-h5 text-white">
                    Nome do Material<br /><div class="text-h6">PDF (2mb)</div>
                </div>
                <div class="col-4 text-right">
                    <q-btn 
						type="button"
						rounded dense
						size="md" 
						class="text-white text-lowercase shapeButton bg-white text-black q-my-md" 
						@click="null"
						label="baixar" />
                </div>
            </div>
            
            <div class="row flex-center items-center content-center justify-center full-width q-pa-lg">
                <div class="col-auto float-left q-pr-xl">
                    <q-img :src="'img/expico1.png'" class="cardImg roundedSmallCorners" />
                </div>
                <div class="col-4 text-h5 text-white">
                    Nome do Material<br /><div class="text-h6">PDF (2mb)</div>
                </div>
                <div class="col-4 text-right">
                    <q-btn 
						type="button"
						rounded dense
						size="md" 
						class="text-white text-lowercase shapeButton bg-white text-black q-my-md" 
						@click="null"
						label="baixar" />
                </div>
            </div>
        </div>
    </q-card-section>
    
</template>

<script> 
	import mainVideoPlayer from 'src/components/app-container/component__Main-VideoPlayer.vue'
	
	export default {
		name: 'PopupWorkingClass',

		components: {
			mainVideoPlayer,
		},
	}
</script>

<style>
	.cardImg {
		height: 160px;
		width: 120px;
	}

	.workingClassArea {
		width: 90%;
		min-height: 200px;
	}
</style>