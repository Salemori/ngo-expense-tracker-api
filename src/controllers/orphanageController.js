const { response, request } = require("express");
const Orphanage = require("../models/orphanageModel");
const mongoose = require("mongoose");

exports.getOrphanages = async (request, response) => {
    try {
        let orphanages = await Orphanage.find({ isActive: true }, "name totalExpense createdBy");
        console.log(orphanages);
        // response.send(`Retrieved all orphanage:${orphanages}`);

        response.status(200).json({
            status: "success",
            orphanages,
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: "failed",
            message: error.message,
        });
    }
};

exports.getOrphanageById = async (request, response) => {
    try {
        // const {id} = request.body;
        const { id } = request.params;

        // ------ I can use this method
        // const orphanage = await Orphanage.findOne({id:id, isActive:true});
        // if (!orphanage) {
        //     return response.status(404).json({
        //         status: "failed",
        //         message: "Orphanage not found"
        //     });
        // }

        // ------ OR this method, but findById() won't work cause it is a "projection" not a filter, doesn't take a second parameter.
        let validId = mongoose.isValidObjectId(id);
        if (!validId){
            response.json({
                status: "failed",
                message: "Invalid ID"
            });
        }
        const orphanage = await Orphanage.findById(id);

        if (!orphanage || !orphanage.isActive) {
            return response.status(404).json({
                status: "failed",
                message: "Orphanage not found",
            });
        }

        response.status(200).json({
            status: "success",
            orphanage,
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: "failed",
            message: error.message,
        });
    }
};

exports.getOrphanageByName = async (request, response) => {
    try {
        // const {id} = request.body;
        const { name } = request.body;

        if (!name) {
            return response.status(400).json({
                status: "failed",
                message: "Name parameter is required",
            });
        }

        const orphanage = await Orphanage.findOne({ name: name });

        if (!orphanage) {
            return response.status(404).json({
                status: "failed",
                message: "Orphanage not found",
            });
        }

        response.status(200).json({
            status: "success",
            orphanage,
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: "failed",
            message: error.message,
        });
    }
};

exports.getOphanageByUser = async(request, response) => {
   try {

    const orphanagesByUser = await Orphanage.find({isActive: true}).populate("createdBy");
    
    response.status(200).json({
        status: "success",
        message: "Orphanage retrived successfully",
        orphanagesByUser
    });
   } catch (error) {
    response.json({
        status: "failed",
        message: error.message,
        orphanagesByUser
    });
   }
}

exports.createOrphanage = async (request, response) => {
    try {
        const data = request.body;
        const { name } = data;

        const orphanageExist = await Orphanage.findOne({ name: name });

        if (orphanageExist) {
            console.log(orphanageExist);

            return response.status(409).json({
                status: "failed",
                message: "Orphanage already exist",
            });
        }

        const orphanage = new Orphanage({
            name: data.name,
            contact: {
                phone: data.contact.phone,
                email: data.contact.email,
            },
            location: {
                address: data.location.address,
                city: data.location.city,
                state: data.location.state,
                country: data.location.country,
            },
            createdBy: data.createdBy
        });
        await orphanage.save();

        response.status(201).json({
            status: "success",
            message: "Orphanage created successfully",
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: "failed",
            message: error.message,
        });
    }
};

exports.updateOrphanage = async (request, response) => {
    try {
        const { id } = request.params;

        const updateBody = request.body;

        const orphanage = await Orphanage.findByIdAndUpdate(id, updateBody, {
            new: true,
            runValidators: true,
        });

        if (!orphanage) {
            console.log(orphanage);
            return response.status(404).json({
                status: "failed",
                message: "Orphanage not found",
            });
        }

        response.status(200).json({
            status: "success",
            message: "Orphanage updated successfully",
            //orphanage
        });
    } catch (error) {
        response.json({
            status: "failed",
            message: error.message,
        });
    }
};

exports.deleteOrphanage = async (request, response) => {
    try {
        const { id } = request.params;

        const orphanage = await Orphanage.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!orphanage) {
            console.log(orphanage);
            return response.status(404).json({
                status: "failed",
                message: "Orphanage not found",
            });
        }

        response.status(200).json({
            status: "success",
            message: "Orphanage deleted successfully",
        });
    } catch (error) {
        response.json({
            status: "failed",
            message: error.message
        });
     }
};

exports.permanentDeleteOrphanage = async (request, response) => {
    try {
        const { id } = request.params;

        const orphanage = await Orphanage.findByIdAndDelete(id);
        if (!orphanage) {
            return response.status(404).json({
                status: "failed",
                message: "Orphanage not found",
            });
        }

        response.status(200).json({
            status: "success",
            message: "Orpahanage permanent delete successful",
        });
    } catch (error) {
        response.json({
            status: "failed",
            message: error.message
        });
     }
};
