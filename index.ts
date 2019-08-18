import phin from "phin";
import util from "util";
import pkg from "./package.json";
import { reverse } from "dns";

class APIError extends Error {
	constructor(err: string, message: string, response?: any) {
		response ? super(`${err}, ${message}, response: ${util.inspect(response, { depth: 1 })}`) : super(`${err}, ${message}`);
		this.name = "APIError";
	}
}

interface JSONResponse {
	success: boolean;
	response: {
		image: string;
		filetype: "png" | "jpg" | "jpeg" | "webp" | "gif" | "mp4";
		name: string;
	};
}

interface NonJSONResponse {
	image: Buffer;
	imageName: string;
	imageFileType: string;
	imageURL: string;
}


class FoxAPI {
	userAgent: string;
	constructor(userAgent?: string) {
		if (!userAgent) userAgent = `FoxAPI/${pkg.version} (https://github.com/FurryBotCo/FoxAPI)`;

		this.userAgent = userAgent;
	}

	ca(fetchImage: true): Promise<NonJSONResponse>;
	ca(fetchImage: false): Promise<JSONResponse>;
	ca(fetchImage: boolean): Promise<NonJSONResponse | JSONResponse>;

	async ca(fetchImage?: boolean) {
		if (typeof fetchImage !== "boolean") fetchImage = false;
		return phin({
			method: "GET",
			url: "https://randomfox.ca/floof/",
			headers: {
				"User-Agent": this.userAgent
			}
		}).then(async (res) => {
			if (res.statusCode !== 200) throw new APIError(`${res.statusCode} ${res.statusMessage}`, res.body.toString());

			const b = JSON.parse(res.body.toString());

			if (fetchImage) return {
				image: await phin(b.image.replace(/http:/, "https:")).then(i => i.body),
				imageName: b.image.split("/").reverse()[0],
				imageFileType: b.image.split("/").reverse()[0].split(".").reverse()[0],
				imageURL: b.image.replace(/http:/, "https:")
			};
			else return {
				success: true,
				response: {
					image: b.image.replace(/http:/, "https:"),
					filetype: b.image.split("/").reverse()[0].split(".").reverse()[0],
					name: b.image.split("/").reverse()[0]
				}
			};
		}).catch(err => {
			throw err;
		});
	}

	de(fetchImage: true): Promise<NonJSONResponse>;
	de(fetchImage: false): Promise<JSONResponse>;
	de(fetchImage: boolean): Promise<NonJSONResponse | JSONResponse>;

	async de(fetchImage?: boolean) {
		if (typeof fetchImage !== "boolean") fetchImage = false;
		return phin({
			method: "GET",
			url: "https://foxrudor.de",
			headers: {
				"User-Agent": this.userAgent
			}
		}).then(async (res) => {
			if (res.statusCode !== 200) throw new APIError(`${res.statusCode} ${res.statusMessage}`, res.body.toString());

			// const b = JSON.parse(res.body.toString());

			if (fetchImage) return {
				image: res.body,
				imageName: "foxrudor.de.jpg",
				imageFileType: "jpg",
				imageURL: "https://foxrudor.de"
			};
			else return {
				success: true,
				response: {
					image: "https://foxrudor.de",
					filetype: "jpg",
					name: "foxrudor.de.jpg"
				}
			};
		}).catch(err => {
			throw err;
		});
	}

	fb(fetchImage: true): Promise<NonJSONResponse>;
	fb(fetchImage: false): Promise<JSONResponse>;
	fb(fetchImage: boolean): Promise<NonJSONResponse | JSONResponse>;

	async fb(fetchImage?: boolean) {
		if (typeof fetchImage !== "boolean") fetchImage = false;
		return phin({
			method: "GET",
			url: "https://api.furry.bot/animals/fox",
			headers: {
				"User-Agent": this.userAgent
			}
		}).then(async (res) => {
			if (res.statusCode !== 200) throw new APIError(`${res.statusCode} ${res.statusMessage}`, res.body.toString());

			const b = JSON.parse(res.body.toString());

			if (fetchImage) return {
				image: await phin(b.response.image).then(res => res.body),
				...b
			};
			else return b;
		}).catch(err => {
			throw err;
		});
	}
}

export = FoxAPI;