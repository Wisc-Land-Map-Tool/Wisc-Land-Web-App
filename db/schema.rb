# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140428010320) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assignments", force: true do |t|
    t.integer  "UserIdAssigner"
    t.integer  "user_id"
    t.integer  "location_id"
    t.integer  "Status"
    t.datetime "CompletionTime"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "polygon"
  end

  create_table "classifications", force: true do |t|
    t.integer  "class_id"
    t.string   "class_name"
    t.integer  "level"
    t.integer  "parent"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "field_data", force: true do |t|
    t.integer  "covertype1_id"
    t.integer  "covertype2_id"
    t.integer  "covertype3_id"
    t.integer  "confidence_level"
    t.integer  "canopy_perc"
    t.text     "cover_comment"
    t.text     "canopy_comment"
    t.text     "general_comment"
    t.integer  "identification_method"
    t.integer  "assignment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "mature_height"
  end

  create_table "forest_species", force: true do |t|
    t.integer "speciesId"
    t.string  "speciesName"
  end

  create_table "forest_types", force: true do |t|
    t.string   "species_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "forest_id"
  end

  create_table "locations", force: true do |t|
    t.decimal  "Long"
    t.decimal  "Lat"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", force: true do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "species_entries", force: true do |t|
    t.integer  "field_data_id"
    t.integer  "forest_type_id"
    t.integer  "percentage"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "approved",               default: false, null: false
    t.string   "first_name"
    t.string   "last_name"
  end

  add_index "users", ["approved"], name: "index_users_on_approved", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "users_roles", id: false, force: true do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

  create_table "vegetation_entries", force: true do |t|
    t.integer  "vegetation_id"
    t.integer  "data_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "vegetations", force: true do |t|
    t.string   "vegetation_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "vegetation_id"
  end

end
