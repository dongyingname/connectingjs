
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('famous_people', function(table){
            table.integer('famous_person_id').references('milestones.id')
        })
      ])
    };

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('famous_people', function(table){
          table.dropColumn('famous_person_id');
        })
      ])
    };