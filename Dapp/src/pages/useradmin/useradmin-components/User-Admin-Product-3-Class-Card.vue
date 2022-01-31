<template>
	<!-- está page é compartilhada com product-3 e product-4 -->

	<q-card horizontal class="smModalSize inline">
		<q-card-section class="row full-width">
			<div
				class="row items-center content-center justify-around full-width"
			>
				<div class="text-subtitle2 text-weight-bold col-6">
					Class Title {{ $__ ? "Class ID: " + classItemObject.class_ID : "" }}
					<div :title="$__ ? 'Class ID: ' + classItemObject.class_ID : ''" class="text-h5 cursor-pointer" @click=" classObjectEditModal('edit', classItemObject.class_ID)" v-if="type == 1">
						{{ classItemObject.class_title ? classItemObject.class_title : "[Course must have a name - maybe an amazing title]" }}
					</div>
					<div class="text-h6 disabled" v-if="type == 2">
						{{ classItemObject.class_title ? classItemObject.class_title : "[Course must have a name - maybe an amazing title]" }}
					</div>
				</div>

				<div class="inline-block" v-if="type == 1">
					<div
						class="text-subtitle2 text-weight-bold col inline-block q-px-lg"
					>
						Duration
						<div class="text-subtitle">
							{{ classItemObject.class_run }}
						</div>
					</div>
					<!--
	                <div :class="'text-subtitle2 text-weight-bold col-2' + (type == 1 ? ' disabled' : '')">
	                    Atividades
	                    <div class="text-subtitle1">{{ classItemObject.class_activities }}</div>
	                </div>
	                //-->
					<div
						class="text-subtitle2 text-weight-bold col inline-block q-px-lg"
						v-if="
							classItemObject.class_master ||
							classItemObject.class_sample
						"
					>
						Type
						<div class="text-subtitle1">
							<div
								class="inline-block"
								v-if="classItemObject.class_master"
							>
								Presentation&nbsp;
							</div>
							<div
								class="inline-block"
								v-if="classItemObject.class_sample"
							>
								Free
							</div>
						</div>
					</div>
				</div>

				<div class="inline-block" v-if="type == 2">
					<div
						class="text-subtitle2 text-weight-bold col inline-block q-px-lg"
					>
						Questions
						<div class="text-subtitle1">
							{{
								classItemObject.test_choices.length
									? classItemObject.test_choices.length
									: "none"
							}}
						</div>
					</div>
				</div>

				<div class="col">
					<q-space />
				</div>
				<div class="col-auto on-right" v-if="type == 1">
					<div
						class="column justify-center items-center vertical-middle"
					>
						<div v-if="type == 1">
							<div class="row">
								<q-icon
									:name="
										classItemObject.class_hasvideo
											? 'check_circle_outline'
											: 'error'
									"
									size="2rem"
									class="text-green-4"
									@click="null"
								/>
							</div>
							<div class="row">upload video</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row inline-block q-pl-lg fit" v-if="type == 2">
				<div
					class="row flex full-width"
					v-for="classTest in classItemObject.test_choices"
					:key="classTest.n"
				>
					<div class="col-11">
						{{ classTest.test_question ? classTest.test_question : "[Questions must have be set - try a hard one]" }}
						{{ $__ ? " Test ID: " + classTest.test_ID : "" }}
					</div>
					<div class="col-1">
						<q-btn
							flat
							dense
							@click="testObjectEditModal('edit', classTest)"
							no-caps
						>
							<q-icon
								color="accent"
								name="edit"
								class="floating-label"
								:title="
									$__ ? 'Test ID: ' + classTest.test_ID : ''
								"
							/>
						</q-btn>
						<q-btn
							flat
							dense
							@click="
								testObjectEditModal(
									'del',
									classTest.test_ID,
									classItemObject.class_ID
								)
							"
							no-caps
						>
							<q-icon
								color="accent"
								name="delete"
								class="floating-label"
								:title="
									$__ ? 'Test ID: -' + classTest.test_ID : ''
								"
							/>
						</q-btn>
					</div>
				</div>
			</div>
		</q-card-section>
	</q-card>
	<div
		class="column justify-center items-center vertical-middle"
		v-if="type == 2"
	>
		<q-btn
			flat
			dense
			unelevated
			type="a"
			:title="$__ ? 'Class ID: ' + classItemObject.class_ID : ''"
			@click="testObjectEditModal('add', 0, classItemObject.class_ID)"
		>
			<div class="row">
				<q-icon
					name="add_circle_outline"
					size="2rem"
					class="floating-label"
				/>
			</div>
			<div class="row">add question</div>
		</q-btn>
	</div>
</template>

<script>
import { ref, inject } from "vue";

export default {
	name: "AdminCoursesNewClassCard",

	props: {
		type: {
			type: [String, Number],
			required: false,
		},
		classItemObject: {
			type: Object,
			required: true,
			default: function () {
				return {
					class_ID: ref(null),
					class_foreign_UID: $root.$cube.value.QUERY.UID,
					class_foreign_course_ID: $root.$cube.value.QUERY.courseID,
					class_title: "",
					class_description_short: "",
					class_description: "",
					class_run: 0,
					class_sample: false,
					class_master: false,
					class_activities: 0,
					class_hasvideo: false,
					class_videoURL: "",
					class_bigtext: "",

					test_choices: [],
				};
			},
		},
	},
	setup() {
		/* funções que vem das páginas PAI */
		const classObjectEditModal = inject("classObjectEditModal");
		const testObjectEditModal = inject("testObjectEditModal");

		return {
			classObjectEditModal,
			testObjectEditModal,
		};
	},
};
</script>
