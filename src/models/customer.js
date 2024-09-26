const { name } = require("ejs");
const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: String,
    phone: String,
    email: String,
    image: String,
    description: String,
  },
  {
    timestamps: true,
    statics: {
      async deleteMulti(ids) {
        for (const id of ids) {
          await this.deleteById(id);
        }
      },
    },
  }
);
schema.plugin(mongoose_delete, { overrideMethods: true });
const Customer = mongoose.model("customers", schema);
module.exports = Customer;
