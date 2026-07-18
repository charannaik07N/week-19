import { supabase } from './supabaseClient';

/**
 * Ticket Repository
 * Handles all direct database interactions related to tickets.
 */
export const ticketRepository = {
  /**
   * Fetches all tickets from the database.
   * @returns {Promise<Array>} List of tickets
   */
  async getAllTickets() {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw new Error(`Error fetching tickets: ${error.message}`);
    return data;
  },

  /**
   * Fetches a specific ticket by its ID.
   * @param {string|number} id - The ticket ID
   * @returns {Promise<Object>} The ticket data
   */
  async getTicketById(id) {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw new Error(`Error fetching ticket ${id}: ${error.message}`);
    return data;
  },

  /**
   * Inserts a new ticket into the database.
   * @param {Object} ticketData - The data for the new ticket
   * @returns {Promise<Object>} The created ticket
   */
  async createTicket(ticketData) {
    const { data, error } = await supabase
      .from('tickets')
      .insert([ticketData])
      .select()
      .single();
      
    if (error) throw new Error(`Error creating ticket: ${error.message}`);
    return data;
  },

  /**
   * Updates an existing ticket.
   * @param {string|number} id - The ticket ID
   * @param {Object} updates - The fields to update
   * @returns {Promise<Object>} The updated ticket
   */
  async updateTicket(id, updates) {
    const { data, error } = await supabase
      .from('tickets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw new Error(`Error updating ticket ${id}: ${error.message}`);
    return data;
  },

  /**
   * Deletes a ticket from the database.
   * @param {string|number} id - The ticket ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteTicket(id) {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id);
      
    if (error) throw new Error(`Error deleting ticket ${id}: ${error.message}`);
    return true;
  }
};
