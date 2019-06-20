
function up(knex) {
	return knex.schema
		.createTable("race", table => {
			table.increments("id").primary();
			table.string("name").notNullable();
			table.string("s3_photo_key", 1000);
			table.date("date");
			table.datetime("start_time");
			table.datetime("end_time");
			table.enum("status", [
				"Not Started",
				"In Progress",
				"Completed",
			]);
			table.string("address");
			table.float("latitude");
			table.float("longitude");
		})
		.createTable("participant", table => {
			table.increments("id").primary();
			table.string("first_name").notNullable();
			table.string("last_name").notNullable();
			table.date("birthdate").notNullable();
			table.string("email").notNullable();
			table.text("waiver_signature");
		})
		.createTable("race_participant", table => {
			table.increments("id").primary();
			table.datetime("start_time");
			table.datetime("end_time");
			table.integer("participant_id").notNullable();
			table.foreign("participant_id").references("participant.id");
			table.integer("race_id").notNullable();
			table.foreign("race_id").references("race.id");
		});
		// .createTable("participant_checkin", table => {
		// 	table.increments("id").primary();
		// 	table.datetime("time").notNullable();
		// 	table.float("latitude");
		// 	table.float("longitude");
		// 	table.string("s3_photo_key", 1000);
		// 	table.text("notes");
		// 	table.integer("race_participant_id").notNullable();
		// 	table.foreign("race_participant_id").references("race_participant.id");
		// });
};

exports.up = function(knex, Promise) {
	return up(knex);
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable("race_participant")
		.dropTable("participant")
		.dropTable("race");
};
