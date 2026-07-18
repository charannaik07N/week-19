import { supabase } from './supabaseClient';

/**
 * Agent Repository
 * Handles all direct database interactions related to support agents.
 */
export const agentRepository = {
  /**
   * Fetches all agents from the database.
   * @returns {Promise<Array>} List of agents
   */
  async getAllAgents() {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('name', { ascending: true });
      
    if (error) throw new Error(`Error fetching agents: ${error.message}`);
    return data;
  },

  /**
   * Fetches a specific agent by their ID.
   * @param {string|number} id - The agent ID
   * @returns {Promise<Object>} The agent data
   */
  async getAgentById(id) {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw new Error(`Error fetching agent ${id}: ${error.message}`);
    return data;
  },

  /**
   * Fetches agents by their current status (e.g., 'available', 'offline').
   * @param {string} status - The status to filter by
   * @returns {Promise<Array>} List of filtered agents
   */
  async getAgentsByStatus(status) {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('status', status)
      .order('name', { ascending: true });
      
    if (error) throw new Error(`Error fetching agents with status ${status}: ${error.message}`);
    return data;
  }
};
