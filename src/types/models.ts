/* All API response models should be in this files */

export interface ApiResponse<T> {
	error?: string
	data?: T
}

export interface ClientConfigurationAuth {
	issuer: string
	client_id: string
}

export interface ClientConfiguration {
	auth: ClientConfigurationAuth
	api_url: string
}
