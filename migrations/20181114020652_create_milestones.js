exports.up = function(knex, Promise) {  
    return Promise.all([
      knex.schema.createTable('milestones', function(table){
        table.string('project_name');
        table.string('rating');
        table.timestamps();
        table.increments('id');
      })
    ]);
  };
  
exports.down = function(knex, Promise) {  
    return Promise.all([
      knex.schema.dropTable('milestones')
    ]);
};
