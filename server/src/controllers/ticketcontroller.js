const ticketDb = require("../Models/Ticketmodel")

const create = async (req, res) => {
    try {
        console.log(req.body);
        const { eventId, type, price, promoCode, paymentStatus } = req.body;
        const ticket = new ticketDb({ eventId, type, price, promoCode, paymentStatus });
        const result = await ticket.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};



const getAll = async (req, res) => {
    try {
        const tickets = await ticketDb.find();
        res.status(200).send(tickets);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};


const ticketDetails = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticket = await ticketDb.findById({ _id: ticketId });
        if (!ticket) {
            return res.status(404).send({ error: "Ticket not found" });
        }
        res.status(200).send(ticket);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const getTicketsByEventId = async (req, res) => {
    try {
        const { eventId } = req.params; // Get the eventId from the request parameters
        const tickets = await ticketDb.find({ eventId }); // Find all tickets with the given eventId
        if (tickets.length === 0) {
            return res.status(404).send({ error: "No tickets found for this event ID" });
        }

        // Extract prices from the tickets
        const prices = tickets.map(ticket => ({
            type: ticket.type,
            price: ticket.price
        }));
        res.status(200).send(prices); // Respond with the prices
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { ticketId } = req.params; // Get the ticketId from the request parameters
        const ticket = await ticketDb.findByIdAndDelete(ticketId); // Find and delete the ticket by ID
        if (!ticket) {
            return res.status(404).send({ error: "Ticket not found" }); // If no ticket is found, return a 404 error
        }
        res.status(200).send({ message: "Ticket deleted successfully" }); // Success response
    } catch (err) {
        res.status(500).send({ error: err.message }); // Handle server errors
    }
};

const updateTicket = async (req, res) => {
    try {
        const { ticketId } = req.params; // Get the ticketId from the request parameters
        const { type, price, promoCode, paymentStatus } = req.body; // Get the new values from the request body

        const updatedTicket = await ticketDb.findByIdAndUpdate(
            ticketId, // Ticket to update
            { type, price, promoCode, paymentStatus }, // Update fields
            { new: true } // Return the updated document
        );

        if (!updatedTicket) {
            return res.status(404).send({ error: "Ticket not found" }); // If no ticket is found to update
        }

        res.status(200).send(updatedTicket); // Return the updated ticket
    } catch (err) {
        res.status(500).send({ error: err.message }); // Handle server errors
    }
};






module.exports = {
    create,
    getAll,
    ticketDetails, getTicketsByEventId, deleteTicket,
    updateTicket

}