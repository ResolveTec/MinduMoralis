<template>
	<div class="mdModalSize flex justify-around full-width">
		<div class="row fit">
			<div class="col q-col-gutter-y-md" v-if="classObject.length">
				<div
					class="col full-width"
					v-for="classItem in classObject"
					:key="classItem.n">
					<classCard type="2" :classItemObject="classItem" />
				</div>
			</div>
			<div class="justify-center items-center vertical-middle" v-if="!classObject.length">
				<div>No class added. Return and add classes.</div>
			</div>

			<q-form autocomplete="off">
				<q-dialog
					class="q-py-sm justify-center items-center full-width no-scroll rounded fit"
					v-model="editedModal"
					transition-show="scale"
					transition-hide="scale">
					<q-card class="editedModalWidth rounded">
						<q-card-section
							class="row q-gutter-sm justify-center items-center full-width" >
							<q-card-section
								class="row q-gutter-sm justify-center items-center full-width q-px-xl">
								<div class="row text-h5 q-pb-xl">
									{{
										this.editedIndex > -1
											? "Edit Ask and Answers"
											: "Add Question"
									}}
								</div>
								<div class="row full-width">
									<q-input
										rounded
										outlined
										clearable
										ref="test"
										v-model="editedItem.test_ID"
										type="text"
										class="hidden full-width"
									>
									</q-input>
									<q-input
										rounded
										outlined
										clearable
										ref="test"
										v-model="editedItem.test_question"
										type="text"
										class="full-width"
										label="question"
										maxlength="256"
										lazy-rules
										:rules="[
											(val) =>
												!!val ||
												'Question can not be empty',
										]">
										<template v-slot:append>
											<q-icon
												name="help_outline"
												color="accent"
											/>
										</template>
									</q-input>
								</div>
								<div
									class="q-pa-none full-width"
									v-if="editedItem.test_rightanswer > -1">
									<div
										class="row no-wrap full-width"
										v-for="(
											item, i
										) in editedItem.test_choices"
										:key="item.n">
										<div class="col full-width">
											<q-input
												rounded
												outlined
												clearable
												ref="test"
												type="text"
												class="full-width"
												v-model="
													editedItem.test_choices[i]
														.test_question
												"
												placeholder="new answer"
												:hint="'alternative ' + (i + 1)"
												maxlength="128"
											>
											</q-input>
										</div>
										<div class="q-pt-md q-pr-md">
											<q-radio
												dense
												v-model="
													editedItem.test_rightanswer
												"
												:val="item.test_choice_ID"
												class="q-pl-md"
											/>
										</div>
									</div>
								</div>

								<div
									class="row no-wrap full-width justify-center items-center">
									<div class="q-pb-md">
										Choose at the right side, the right
										answer.
									</div>
								</div>
							</q-card-section>

							<q-card-actions
								class="row q-py-lg q-gutter-md justify-center items-center full-width"
								v-if="this.editedStatus == 'add'">
								<div class="q-col-gutter-y-md">
									<q-btn
										rounded
										dense
										type="button"
										size="lg"
										class="text-white text-lowercase regularButton q-mr-sm"
										@click="ready()"
										label="cancel"
										v-close-popup
									/>
									<q-btn
										rounded
										dense
										type="button"
										size="lg"
										class="text-white text-lowercase regularButton"
										@click="addItem(editedItem.test_foreign_class_ID)"
										label="add"
										v-close-popup
									/>
								</div>
							</q-card-actions>
						</q-card-section>
					</q-card>
				</q-dialog>
			</q-form>
		</div>
	</div>
</template>

<script>
import { ref, provide } from "vue";
import { v4 as uuid } from "uuid";

import classCard from "./User-Admin-Product-3-Class-Card.vue";

export default {
	name: "AdminCoursesNewExtras",

	components: {
		classCard,
	},
	data() {
		provide("testObjectEditModal", this.testObjectEditModal);

		/* importa json da memoria apenas perguntas do usuario do curso selecionado */
		let classObject = _.filter(this.$root.$cube.value.data.classes, [
			"class_foreign_course_ID",
			this.$root.$cube.value.QUERY.courseID,
		]);
		let testObject = _.filter(this.$root.$cube.value.data.tests, [
			"test_foreign_UID",
			this.$root.$cube.value.QUERY.UID,
		]);

		_.map(classObject, function (obj) {
			return _.assign(obj, {
				test_choices: _.filter(testObject, [
					"test_foreign_class_ID",
					obj.class_ID,
				]),
			});
		});

		return {
			classObject,
			objectRows: testObject,

			editedModal: ref(false),
			editedIndex: -1,
			editedStatus: null,
			editedItem: [],
		};
	},
	methods: {
		/* exibe modal e direciona nos seguintes casos a partir de Product-4-Class-Card
				se for Objeto: editar teste
				se for -ID(negativo): apagar teste
				se for 0: incluir teste
			*/
		testObjectEditModal(switcher, classTestMutable, courseID) {
			this.editedStatus = switcher;
			if (switcher == "edit") {
				this.editedItem = classTestMutable;
				this.editedIndex = classTestMutable.test_ID;
				this.editedModal = true;
			} else if (switcher == "del") {
				this.editedIndex = classTestMutable;
				this.deleteItem(this.editedIndex, courseID);
			} else {
				this.ready();
				this.editedIndex = courseID;
				this.editedModal = true;
			}
		},

		addItem(val) {
			this.editedItem.test_foreign_class_ID = this.editedIndex;
			/*
			if (this.editedIndex > 0) {
				
				let findRightCLASSObjectIndex = _.findIndex(this.classObject, [
					"class_ID",
					this.editedIndex,
				]);
				console.log(this.objectRow, findRightCLASSObjectIndex)
				Object.assign( this.objectRows[this.editedIndex], this.editedItem );
			
			} else {
				// adiciona em array de exibição MIX de 2 classes 
			}
			*/
			let findRightCLASSObjectIndex = _.findIndex(this.classObject, [
				"class_ID",
				this.editedIndex,
			]);

			this.classObject[findRightCLASSObjectIndex].test_choices.push(
				this.editedItem
			);

			/* adiciona global TESTS(para navegação) */
			this.$root.$cube.value.data.tests.push(this.editedItem);
			this.ready();
		},
		deleteItem(val, classID) {
			if (confirm("Delete this Question?")) {
				/* apaga em array de exibição MIX de 2 classes */
				let findRightCLASSObjectIndex = _.findIndex(this.classObject, [
					"class_ID",
					classID,
				]);
				let findRightTestObjectIndexInsideCLASS = _.findIndex(
					this.classObject[findRightCLASSObjectIndex].test_choices,
					["test_ID", val]
				);

				this.classObject[findRightCLASSObjectIndex].test_choices.splice(
					findRightTestObjectIndexInsideCLASS,
					1
				);

				/* apaga global TESTS(para navegação) */
				let findClassRightObjectIndex = _.findIndex(
					this.$root.$cube.value.data.tests,
					["test_ID", val]
				);
				this.$root.$cube.value.data.tests.splice(
					findClassRightObjectIndex,
					1
				);

				this.classEditedIndex = -1;
				this.classModal = false;
			}
			this.ready();
		},
		editItem(item) {
			this.editedIndex = this.objectRows.indexOf(item);
			this.editedItem = this.objectRows[this.editedIndex];
			this.itemModal = true;
		},
		ready() {
			this.editedItem = {
				test_ID: uuid(), //_.uniqueId()
				test_foreign_UID: this.$root.$cube.value.QUERY.UID,
				test_foreign_course_ID: this.$root.$cube.value.QUERY.courseID,
				test_foreign_class_ID: 0,
				test_question: "",
				test_useranswer: 0,
				test_rightanswer: 0,
				test_choices: [
					{
						test_choice_ID: 1,
						test_question: "",
						test_ambiguous: false,
						test_datetime: null,
					},
					{
						test_choice_ID: 2,
						test_question: "",
						test_ambiguous: false,
						test_datetime: null,
					},
					{
						test_choice_ID: 3,
						test_question: "",
						test_ambiguous: false,
						test_datetime: null,
					},
				],
			};
		},
	},
};
</script>
