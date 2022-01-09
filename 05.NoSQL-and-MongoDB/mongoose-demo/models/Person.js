const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
	name: String,
	age: Number,
	//Better option for validation is to set the propery as object
	grade: {
		type: Number,
		required: [true, 'Grade is required!'],
		min: 2,
		max: [6, 'Grade cannot be bigger than 6'],
	},
});

personSchema.methods.greet = function () {
	return `Hello, I am ${this.name} and I am ${this.age} years old.`;
};

personSchema.virtual("isExcellent").get(function () {
	return this.grade >= 5.5;
});

//One harder way to validate
// personSchema.path('grade').validate(function() {
// 	return this.grade >= 2 && this.grade <= 6;
// }, 'Grade should be in the range 2-6')

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
