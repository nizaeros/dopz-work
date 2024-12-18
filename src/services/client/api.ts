// Add this function to the existing api.ts file
export async function fetchClientById(clientId: string) {
  try {
    const { data, error } = await supabase
      .from('client_list_view')
      .select(`
        client_account_id,
        friendly_name,
        logo_image_url,
        is_active
      `)
      .eq('client_account_id', clientId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}