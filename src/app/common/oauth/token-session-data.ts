
/**
 * The data that is stored in local storage.
 * 
 * @author Philipp Thomas
 */
export interface TokenSessionData {
	user_name : string;
	authorities : string[];
	exp : number;
	scope : string[];
	client_id : string;
}
