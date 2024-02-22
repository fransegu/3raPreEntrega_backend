import ticketModel from "../../../config/models/ticket.model.js";

class TicketManager {
  async findById(id) {
    const response = await ticketModel.findById(id);
    return response;
  }

  async findByEmail(email) {
    const response = await ticketModel.findOne({ email });
    return response;
  }

    async createTicket(ticket) {
      const response = await ticketModel.create(ticket);
      return response;
    }
  }
  
  export const ticketsManager = new TicketManager();