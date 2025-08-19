const Category = require('../../models/Categories/Categories');
const asyncHandler = require('express-async-handler');

//@desc create new category
//@route POST /api/v1/categories
//@access private
exports.createCategory = asyncHandler( async (req,res,next)=>{
       const { name } = req.body;
       isCategoryPresent =await Category.findOne({ name });  
       if(isCategoryPresent){
        throw new Error('category already existing ')
       }
      const category = await Category.create({
        name: name,
        author: req?.userAuth?._id,
    });

       res.json({
        status:"success",
        message:"Category created successfully",
        category,
    })
   
});

//@desc Get all categories
//@route GET /api/v1/categories
//@access public
exports.getAllCategories = asyncHandler(
     async(req,res)=>{
     const allCategories =await Category.find({});
      res.status(201).json({
        status:"success",
        message:"All categories successfully fetched",
        allCategories
      })
     }
)

//@desc Delete single category
//@route DELETE /api/v1/categories/:id
//@access private
exports.deleteCategory = asyncHandler(
     async(req,res)=>{
     const catId = req.params.id;
     await Category.findByIdAndDelete(catId);
       res.status(201).json({
        status:"success",
        message:"categories successfully daleted",
    
      })
     });


//@desc Update single category
//@route PUT /api/v1/categories/:id
//@access private
exports.updateCategory = asyncHandler(
     async(req,res)=>{
     const catId = req.params.id;
     const name = req.body.name;
    const updatedCategory = await Category.findByIdAndUpdate(catId,{name:name},{new:true, runValidators: true });
       res.status(201).json({
        status:"success",
        message:"categories successfully updated",
        updatedCategory,
    
      })
     });