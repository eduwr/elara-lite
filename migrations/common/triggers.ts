

export const createTrigger = (table: string, functionName = "update_updated_at_column", hook = "BEFORE INSERT OR UPDATE") => `
  CREATE OR REPLACE TRIGGER trigger_${functionName}
  ${hook} ON ${table} 
  FOR EACH ROW EXECUTE PROCEDURE  ${functionName}();
 `;

export const dropTrigger = (table: string, functionName = "update_updated_at_column") => `
  DROP TRIGGER IF EXISTS trigger_${functionName}
  ON ${table};
 `;