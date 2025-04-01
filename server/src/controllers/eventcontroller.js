const eventDb = require("../Models/eventModel")
const uploadToCloudinary = require("../Utilities/imageUpload")
const mongoose = require("mongoose");

const create = async (req, res) => {
    try {

        const { title, description,date,time, venue } = req.body
        if (!title || !description || !date || !time ||  !venue) {
            return res.status(400).json({ message: "all fields are required" })
        }

        if (!req.file) {
            return res.status(400).json({ message: "image not found" })
        }


        const cloudinaryRes = await uploadToCloudinary(req.file.path)
        console.log(cloudinaryRes, "image uploaded by cloudinary");



        const newEvent = new eventDb({ title, description,date,time, venue, image: cloudinaryRes })

        let savedEvent = await newEvent.save()
        if (savedEvent) {
            return res.status(200).json({ message: "event added", savedEvent })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "server error", error: error.message })
    }
}




const listEvents = async (req, res) => {
    try {
        const eventList = await eventDb.find(); // Find all events in the database
        if (!eventList.length) {
            return res.status(404).json({ message: "No events found" });
        }
        res.status(200).json({ message: "Events retrieved successfully",eventList });
    } catch (error) {
        console.error(error.message); // Log the error for debugging
        res.status(500).json({ message: "Server error", error: error.message });
    }
};





// const eventsDetails = async (req, res) => {
//     try {
//         const { eventId } = req.params; // Extract the event ID from the request parameters
//         const eventsDetails = await eventDb.findById({_id:eventId}); // Find the event by its ID

//         if (!eventsDetails) {
//             return res.status(404).json({ message: "Event not found" });
//         }

//         res.status(200).json({ message: "Event retrieved successfully", eventsDetails });
//     } catch (error) {
//         console.error(error.message); // Log the error for debugging
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };


// const eventsDetails = async (req, res) => {
//   try {
//     const { eventId } = req.params; // Extract the event ID from the request parameters

//     // Validate the event ID
//     if (!mongoose.Types.ObjectId.isValid(eventId)) {
//       return res.status(400).json({ message: "Invalid Event ID format" });
//     }

//     // Find the event by its ID
//     const eventDetails = await eventDb.findById(eventId); // Directly use the ID
//     if (!eventDetails) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     // Send the response
//     res.status(200).json({ message: "Event retrieved successfully", eventDetails });
//   } catch (error) {
//     console.error("Server Error:", error.message); // Log error for debugging
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = { eventsDetails };
const eventsDetails = async (req, res) => {
    try {
      const { eventId } = req.params;
      
      console.log("Received eventId:", eventId);


  
      // Validate the event ID format
      if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ message: "Invalid Event ID format" });
      }
  
      // Find the event by its ID
      const eventDetails = await eventDb.findById(eventId);
      console.log("Event details found:", eventDetails);
      if (!eventDetails) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event retrieved successfully", eventDetails });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  


const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params; // Get the event ID from the request parameters
        const { title, description, date, time, venue } = req.body;
        let imageUrl;

        let isEventExist= await eventDb.findById(eventId);

        if (!isEventExist) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (req.file) {
            const cloudinaryRes = await uploadToCloudinary(req.file.path);
            imageUrl = cloudinaryRes;
        }

        const updatedEvent = await eventDb.findByIdAndUpdate(eventId, { title, description, date, time, venue,image: imageUrl},{ new: true });
        res.status(200).json({message:"Event Updated",updatedEvent})
    }
        catch (error) {
            console.error("Server error:", error.message);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    };

    const deleteEvent = async (req, res) => {
        try {
            const { eventId } = req.params;
            if (!eventId) {
                return res.status(400).json({ message: "Event ID is required" });
            }
    
            const deletedEvent = await eventDb.findByIdAndDelete(eventId);
            if (!deletedEvent) {
                return res.status(404).json({ message: "Event not found" });
            }
    
            return res.status(200).json({ message: "Event deleted successfully", deletedEvent });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    };
    

        


module.exports = {
    create,
    listEvents,
    eventsDetails,
    updateEvent,
    deleteEvent
   
}