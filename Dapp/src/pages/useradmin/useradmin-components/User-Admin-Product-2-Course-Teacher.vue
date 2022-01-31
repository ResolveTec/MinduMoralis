<template>
	<q-table
		binary-state-sort
		flat
		dense
		hide-header
		title="Participant Teachers"
		:rows="objectRows"
		:columns="objectColumns"
		row-key="row => row.teacher_ID"
		class="rounded appDefaultBorder q-pa-lg fit"
		v-model:expanded="editedSelectedRows"
		:rows-per-page-options="[0]"
	>
		<template v-slot:bottom>
			<addTeacher TODO />
			<div
				class="flex flex-center items-center content-center justify-around full-width"
			>
				<div class="column">
					<q-btn flat dense unelevated type="a" @click="ready()"
						><div class="row">
							<q-icon
								name="add_circle_outline"
								size="2rem"
								class="floating-label"
							/>
						</div>
						<div class="row">add Teacher</div></q-btn
					>
				</div>
			</div>
			<q-form autocomplete="off">
				<q-dialog
					v-model="editedModal"
					@hide="editedModal = false"
					transition-show="scale"
					transition-hide="scale"
					class="xlModalSize justify-center items-center full-width no-scroll rounded q-px-xl q-py-xl"
				>
					<q-card class="rounded">
						<q-card-section
							class="row q-gutter-sm justify-center items-center full-width q-px-xl"
						>
							<div class="row text-h5 q-pb-xl">
								{{ !this.editedIndex ? "Add" : "Update" }}
								Teacher
							</div>
							<div class="row full-width">
								<q-input
									rounded
									outlined
									clearable
									ref="teacher"
									v-model="editedItem.teacher_ID"
									type="text"
									class="hidden full-width"
								>
								</q-input>
								<q-input
									rounded
									outlined
									clearable
									ref="teacher"
									v-model="editedItem.teacher_meta.name"
									type="text"
									class="full-width"
									label="Name"
									maxlength="64"
									lazy-rules
									:rules="[
										(val) => !!val || 'Names is required',
									]"
								>
								</q-input>
							</div>
							<div class="row full-width">
								<q-input
									rounded
									outlined
									clearable
									ref="teacher"
									v-model="editedItem.teacher_meta.surname"
									type="text"
									class="full-width"
									label="Last Name"
									maxlength="128"
								>
								</q-input>
							</div>
							<div class="row full-width">
								<q-input
									rounded
									outlined
									clearable
									ref="teacher"
									v-model="editedItem.teacher_meta.email"
									type="email"
									class="full-width"
									label="E-mail"
									maxlength="128"
									lazy-rules
									:rules="[
										(val) => !!val || 'Email is required',
									]"
								>
								</q-input>
							</div>
						</q-card-section>

						<q-card-actions
							class="row q-py-xl q-gutter-md justify-center items-center full-width"
							v-if="this.editedIndex == -1"
						>
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
									@click="addItem()"
									:title="
										$__
											? 'Teacher ID: ' +
											  editedItem.teacher_ID
											: ''
									"
									:label="
										this.editedIndex == -1
											? 'add'
											: 'update'
									"
									v-close-popup
								/>
							</div>
						</q-card-actions>
					</q-card>
				</q-dialog>
			</q-form>
		</template>

		<template v-slot:body="props">
			<q-tr :props="props">
				<q-td key="index" :props="props">
					<q-toggle
						v-model="editedSelectedRows"
						:val="props.row.teacher_ID"
						@update:model-value="updateTeacherIDtoCouseMeta()"
					/>
				</q-td>
				<q-td key="name" dense :props="props">
					{{ props.row.teacher_meta.name }}
					<q-popup-edit
						v-model="props.row.teacher_meta.name"
						buttons
						v-slot="scope"
					>
						<q-input
							type="text"
							v-model="scope.value"
							dense
							autofocus
						/>
					</q-popup-edit>
				</q-td>
				<q-td key="surname" dense :props="props">
					{{ props.row.teacher_meta.surname }}
					<q-popup-edit
						v-model="props.row.teacher_meta.surname"
						buttons
						v-slot="scope"
					>
						<q-input
							type="text"
							v-model="scope.value"
							dense
							autofocus
						/>
					</q-popup-edit>
				</q-td>
				<q-td key="email" dense :props="props">
					{{ props.row.teacher_meta.email }}
					<q-popup-edit
						v-model="props.row.teacher_meta.email"
						buttons
						v-slot="scope"
					>
						<q-input
							type="email"
							v-model="scope.value"
							dense
							autofocus
						/>
					</q-popup-edit>
				</q-td>
				<q-td auto-width key="actions" :props="props">
					<q-btn flat dense @click="editItem(props.row)" no-caps
						><q-icon
							color="accent"
							name="edit"
							class="floating-label"
							:title="
								$__ ? 'Teacher ID: ' + props.row.teacher_ID : ''
							"
					/></q-btn>
					<q-btn flat dense @click="deleteItem(props.row)" no-caps
						><q-icon
							color="accent"
							name="delete"
							class="floating-label"
							:title="
								$__ ? 'Teacher ID: ' + props.row.teacher_ID : ''
							"
					/></q-btn>
				</q-td>
			</q-tr>
		</template>

		<template v-slot:no-data>
			<addTeacher TODO />
			<div
				class="flex flex-center items-center content-center justify-around full-width"
			>
				<div class="column">
					<q-btn flat dense unelevated type="a" @click="ready()"
						><div class="row">
							<q-icon
								name="add_circle_outline"
								size="2rem"
								class="floating-label"
							/>
						</div>
						<div class="row">add teacher</div></q-btn
					>
				</div>
			</div>
		</template>
	</q-table>
</template>

<script>
import { ref, defineComponent } from "vue";
import { v4 as uuid } from "uuid";

const addTeacher = defineComponent(
	() =>
		new Promise((resolve) => {
			resolve({
				template:
					'<div class="flex flex-center items-center content-center justify-around full-width"><div class="column"><q-btn flat dense unelevated type="a" @click="ready()" ><div class="row"><q-icon name="add_circle_outline" size="2rem" class="floating-label"/></div><div class="row">adicionar professor</div></q-btn></div></div>',
			});
		})
);

export default {
	name: "CourseTeachers",

	components: {
		addTeacher: addTeacher,
	},
	props: {
		teachers: {
			required: false,
		},
	},
	data() {
		let teachersObject = _.filter(this.$root.$cube.value.data.teachers, [
			"teacher_foreign_UID",
			this.$root.$cube.value.QUERY.UID,
		]);

		const objectColumns = [
			{
				name: "index",
				field: (row) => row.teacher_ID,
			},
			{
				name: "name",
				required: true,
				label: "Nome",
				align: "left",
				field: (row) => row.teacher_meta.name,
				format: (val) => `${val}`,
				sortable: true,
			},
			{
				name: "surname",
				align: "left",
				label: "Sobrenome",
				field: (row) => row.teacher_meta.surname,
				format: (val) => `${val}`,
				sortable: true,
			},
			{
				name: "email",
				label: "E-mail",
				align: "left",
				field: (row) => row.teacher_meta.email,
				format: (val) => `${val}`,
				sortable: true,
			},
			{
				name: "actions",
				label: "Actions",
				field: "actions",
			},
		];

		return {
			objectColumns,
			objectRows: teachersObject,

			editedSelectedRows: ref(this.teachers),
			editedModal: ref(false),
			editedIndex: -1,
			editedItem: [],
		};
	},
	methods: {
		addItem() {
			if (this.editedIndex > -1) {
				Object.assign(
					this.objectRows[this.editedIndex],
					this.editedItem
				);
			} else {
				this.objectRows.push(this.editedItem);
			}
			this.ready();
		},
		deleteItem(item) {
			const index = this.objectRows.indexOf(item);
			confirm("Delete this item?") && this.objectRows.splice(index, 1);
			this.editedModal = false;
		},
		editItem(item) {
			this.editedIndex = this.objectRows.indexOf(item);
			this.editedItem = this.objectRows[this.editedIndex];
			this.editedModal = true;
		},
		ready() {
			this.editedItem = {
				teacher_ID: uuid(), //_.uniqueId(),
				teacher_foreign_UID: this.$root.$cube.value.QUERY.UID,
				teacher_foreign_course_ID:
					this.$root.$cube.value.QUERY.courseID,
				teacher_type: null,
				teacher_meta: {
					name: "",
					surname: "",
					email: "",
				},
				teacher_info: {
					teacher_since: null,
					teacher_until: null,
				},
				teacher_status: 0,
			};
			this.editedIndex = -1;
			this.editedModal = true;
		},
		updateTeacherIDtoCouseMeta() {
			_.filter(this.$root.$cube.value.data.courses, [
				"ID",
				this.$root.$cube.value.QUERY.courseID,
			])[0].meta.teacher_ID = this.editedSelectedRows;
		},
	},
};
</script>
