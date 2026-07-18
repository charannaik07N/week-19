import { ticketRepository } from '../repositories/ticketRepository';

/**
 * Ticket Service
 * Encapsulates business logic, validation, and data formatting.
 * Acts as a bridge between the application/UI layer and the repository layer.
 */
export const ticketService = {
  /**
   * Retrieves all tickets.
   */
  async fetchAllTickets() {
    try {
      // Add any pre-processing or auth checks here in the future
      return await ticketRepository.getAllTickets();
    } catch (error) {
      console.error('[TicketService] fetchAllTickets failed:', error);
      throw error;
    }
  },

  /**
   * Retrieves specific ticket details.
   */
  async fetchTicketDetails(id) {
    try {
      if (!id) throw new Error('Ticket ID is required to fetch details.');
      return await ticketRepository.getTicketById(id);
    } catch (error) {
      console.error(`[TicketService] fetchTicketDetails failed for id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Validates and creates a new ticket.
   */
  async createNewTicket(ticketData) {
    try {
      // Basic Business Validation
      if (!ticketData.title || !ticketData.description) {
        throw new Error('Title and description are required to create a ticket.');
      }

      // Enrich payload with default service-level attributes
      const payload = {
        status: 'open',
        priority: ticketData.priority || 'medium',
        ...ticketData,
        created_at: new Date().toISOString(),
      };

      return await ticketRepository.createTicket(payload);
    } catch (error) {
      console.error('[TicketService] createNewTicket failed:', error);
      throw error;
    }
  },

  /**
   * Assigns a ticket to a specific agent and updates its status.
   */
  async assignTicketToAgent(ticketId, agentId) {
    try {
      if (!ticketId || !agentId) {
        throw new Error('Ticket ID and Agent ID are required for assignment.');
      }

      const updates = {
        assigned_to: agentId,
        status: 'in_progress',
        updated_at: new Date().toISOString(),
      };

      return await ticketRepository.updateTicket(ticketId, updates);
    } catch (error) {
      console.error(`[TicketService] assignTicketToAgent failed for ticket ${ticketId}:`, error);
      throw error;
    }
  },

  /**
   * Updates the status of an existing ticket securely.
   */
  async updateTicketStatus(ticketId, newStatus) {
    try {
      const validStatuses = ['open', 'in_progress', 'resolved', 'closed'];
      
      if (!validStatuses.includes(newStatus)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      const updates = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };

      return await ticketRepository.updateTicket(ticketId, updates);
    } catch (error) {
      console.error(`[TicketService] updateTicketStatus failed for ticket ${ticketId}:`, error);
      throw error;
    }
  }
};
