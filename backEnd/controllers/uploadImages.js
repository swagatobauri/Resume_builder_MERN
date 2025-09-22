import fs from 'fs'
import path from 'path'

import Resume from "../models/resumeModel.js"
import upload from '../middleware/uploadMiddleware.js'
import { error } from 'console'

export const uploadResumeImages = async (req,res) =>{
    try{

        // CONFIGUR MULTER TO HANDLE IMAGES
        upload.fields([{name: "thumbnail"},{name:"profileImage"}])
        (req,res,async (err)=>{
            if(err){
                return res.status(400).json({message: "File upload failed",error: err.message})
            }

            const resumeId = req.params.id;
            const resume = await Resume.findOne({_id:resumeId, userId: req.user._id})

            if(!resume){
                res.status(404).json({message: "Resume not found or unauthoriuzed"})
            }
            // USE PROCESS CWD TO LOCATE UPLOADS FOLDER
            const uplodaFolder = path.join(process.cwd(),"uplods")
            const baseUrl = `${req.protocol}://${req.get("host")}`;

            const newThumbnail = req.files.thumbnail?.[0];
            const newProfileImage = req.files.profileImage?.[0];

            if(newThumbnail){
                if(resume.thumbnailLink){
                    const oldThumbnail = path.join(uplodaFolder,path.basename(resume.thumbnailLink))

                    if(fs.existsSync(oldThumbnail))
                        fs.unlinkSync(oldThumbnail)
                }
                resume.thumbnailLink = `${baseUrl}/uplods/${newThumbnail.filename}`

            }

            // SAME FOR THE PROFILEPREVIEW IMAGE

            if(newProfileImage){
                if(resume.profileInfo?.profilePreviewUrl){
                    const oldProfile = path.join(uplodaFolder,path.basename(resume.profileInfo.profilePreviewUrl))

                    if(fs.existsSync(oldProfile))
                        fs.unlinkSync(oldProfile)
                }
                resume.profileInfo.profilePreviewUrl = `${baseUrl}/uplods/${newProfileImage.filename}`
            }

            await resume.save();
            res.status(200).json({
                message: "Image uploaded succesfully",
                thumbnailLink: resume.profileInfo.profilePreviewUrl
            })

        })

    } catch(err){
        console.error('error uploading images:', err)
        res.status(500).json({
            message: "Failed to upload images",
            error: err.message
        })
    }
}