import { supabase } from './supabase';

// Schema Types
export interface TableDefinition {
  name: string;
  columns: ColumnDefinition[];
  policies: PolicyDefinition[];
  triggers: TriggerDefinition[];
}

export interface ColumnDefinition {
  name: string;
  type: string;
  isNullable: boolean;
  defaultValue?: string;
  isPrimaryKey: boolean;
  isUnique: boolean;
  references?: {
    table: string;
    column: string;
  };
}

export interface PolicyDefinition {
  name: string;
  action: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
  definition: string;
}

export interface TriggerDefinition {
  name: string;
  timing: 'BEFORE' | 'AFTER';
  event: string;
  function: string;
}

// Function to fetch complete database schema
export async function fetchDatabaseSchema(): Promise<TableDefinition[]> {
  try {
    // Fetch tables
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_schema_info');

    if (tablesError) throw tablesError;

    // Fetch RLS policies
    const { data: policies, error: policiesError } = await supabase
      .rpc('get_policies_info');

    if (policiesError) throw policiesError;

    // Fetch triggers
    const { data: triggers, error: triggersError } = await supabase
      .rpc('get_triggers_info');

    if (triggersError) throw triggersError;

    return tables.map((table: any) => ({
      name: table.table_name,
      columns: table.columns,
      policies: policies.filter((p: any) => p.table_name === table.table_name),
      triggers: triggers.filter((t: any) => t.table_name === table.table_name)
    }));
  } catch (error) {
    console.error('Error fetching database schema:', error);
    throw error;
  }
}

// Function to get a specific table's schema
export async function getTableSchema(tableName: string): Promise<TableDefinition | null> {
  try {
    const schema = await fetchDatabaseSchema();
    return schema.find(table => table.name === tableName) || null;
  } catch (error) {
    console.error(`Error fetching schema for table ${tableName}:`, error);
    throw error;
  }
}

// Utility function to check if a table exists
export async function tableExists(tableName: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', tableName)
      .single();

    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error(`Error checking table ${tableName}:`, error);
    return false;
  }
}

// Function to get enum types
export async function getEnumTypes(): Promise<Record<string, string[]>> {
  try {
    const { data, error } = await supabase
      .rpc('get_enum_types');

    if (error) throw error;
    return data.reduce((acc: Record<string, string[]>, curr: any) => {
      acc[curr.enum_name] = curr.enum_values;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching enum types:', error);
    throw error;
  }
}