<template>
	<q-uploader
        :url="upload"
        :label="label"
        :multiple="multiple"
        class="rounded uploader fit"
        color="accent"
        text-color="black"
        flat bordered
        >
        <template v-slot:list="scope">
            <q-list separator>

                <q-item v-for="file in scope.files" :key="file.name">
                    <q-item-section>
                        <q-item-label class="full-width ellipsis">
                            {{ file.name }}
                        </q-item-label>

                        <q-item-label caption>
                            Situação: {{ file.__status }}
                        </q-item-label>

                        <q-item-label caption>
                            {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                        </q-item-label>
                    </q-item-section>

                    <q-item-section 
                        v-if="file.__img"
                        thumbnail
                        class="gt-xs"
                        >
                        <img :src="file.__img.src">
                    </q-item-section>

                    <q-item-section top side>
                        <q-btn
                            class="gt-xs"
                            size="12px"
                            flat dense round
                            icon="delete"
                            @click="deleteCourseFile(scope, file)"
                            ></q-btn>
                    </q-item-section>
                </q-item>

            </q-list>
        </template>
	</q-uploader>

</template>

<script>
	export default {
		name: 'MainUploader',

		props: {
			multiple: {
				type: Boolean,
				required: true,
				default: false,
			},
			label: {
				type: String,
				required: false,
				default: "Uploader",
			},
			upload: {
				type: String,
				required: true,
			},
		},
		methods: {
            deleteCourseFile(scope,file) {
                scope.removeFile(file)
                // fire event here
            }
        }
	}
</script>

<style scoped>
	.uploader {
		min-height: 146px;
		border-radius: 20px;
		border: 1px solid #cccccc;
	}
</style>