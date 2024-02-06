import { QueryParams, query } from "@/libs/database/queryDB";

export const createQueryBody = (queryString: string, values: any[] = []): QueryParams => {
	return {
		queryString,
		values,
	};
};
