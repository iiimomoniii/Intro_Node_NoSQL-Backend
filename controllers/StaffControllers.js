//Import model from models
const Staff = require('../models/staff');

exports.index = async (req, res, next) => {

    //findAll
    //const staff = await Staff.find();

    //findAndSort by DESC
    const staff = await Staff.find().sort({_id : 1});

    res.status(200).json({
        data: staff
    });
}

exports.searchById = async (req, res, next) => {

    //try check user id is valid
    try {
        //find by id
        const { id  } = req.params;
        const staff = await Staff.findById(id);

        if (!staff) {
            throw new Error('does not exist');
        }

        res.status(200).json({
            data: staff
        });

    } catch (error) {
        res.status(400).json({
            error: {
                message: 'User ID ' + error.message
            }
        });
    }
}

exports.insert = async (req, res, next) => {
    
        //structuring type
        //res.status(200).json({
        //    data: req.body
        //});

        //destructure type
        const { name, salary } = req.body;

        let staff = new Staff({
            name : name,
            salary : salary
        });
        await staff.save();
        
        res.status(200).json({
            message : 'เพิ่มข้อมูลเรียบร้อย'
        });
}

exports.deleteById = async (req, res, next) => {

      //try check user id is valid
    try {
        //delete by id
        const { id  } = req.params;
        const staff = await Staff.findByIdAndDelete({
            _id : id
        });

        if (staff.deleteCount === 0) {
            throw new Error('Cannot delete User ID');
        }

        res.status(200).json({
            message: 'User ID is deleted!'
        });

    } catch (error) {
        res.status(400).json({
            error: {
                message: 'User ID ' + error.message
            }
        });
    }
}

exports.updateById = async (req, res, next) => {

    //try check user id is valid
  try {
      //update by id
      const { id  } = req.params;
      const { name, salary } = req.body;

    // findById
    //   const staff = await Staff.findById(id);
    //   staff.name = name;
    //   staff.salary = salary;
    //   await staff.save();

    //findByID and update 
    const staff = await Staff.findByIdAndUpdate(id, {
        name : name,
        salary : salary
    });
    
      res.status(200).json({
          message: 'User ID is updated!'
      });

  } catch (error) {
      res.status(400).json({
          error: {
              message: 'User ID ' + error.message
          }
      });
  }
}

