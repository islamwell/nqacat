import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler';

async function handleEvent(event) {
	alert("hello")
   const asset = await getAssetFromKV(event, { mapRequestToAsset: serveSinglePageApp });
}
