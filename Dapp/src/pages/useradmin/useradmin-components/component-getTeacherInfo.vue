<template>
	<div v-if="pickTeacher" class="inline-block"><div class="inline-block" v-if="label">{{ label }}&nbsp;</div>{{ pickTeacher }}</div>
</template>

<script>
	import teachers from "src/data/samples/app_teachers.json"

	export default {
		name: 'teacherInfo',
		
        props: {
            label: {
				type: String,
				required: false,
			},
			teacherID: {
				type: Object,
				required: true,
			},
			teachersObject: {
				type: Object,
				required: false,
				default: teachers
			},
		},
		data(props) {
			
			let teachersNamesArray = _(this.teachersObject)
			  .groupBy('teacher_ID')
			  .pick( _.values(this.teacherID) )
			  .values()
			  .value()
		
			var pickTeacher
		
			if (teachersNamesArray.length) {

				pickTeacher  = _.join(_.map(teachersNamesArray, function(val) {
						return _.join( [val[0].teacher_meta.name,val[0].teacher_meta.surname ], ' ');
					}
				)," e ")
				
			}

			return {
				pickTeacher
			}
		},
	}
</script>