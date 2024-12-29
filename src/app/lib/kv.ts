"use server"

import { KeyVaultSecret, SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";

export const getKvClient = () => {
    const credential = new DefaultAzureCredential();
    const keyVaultName = "vinix-foods-kv";
    const url = "https://" + keyVaultName + ".vault.azure.net";
    return new SecretClient(url, credential);
}

export const getSecret = async (secretName: string): Promise<KeyVaultSecret | null> => {
    let secret = null
    try {
        const client = getKvClient()
        secret = await client.getSecret(secretName);
    } catch (error) {
        console.error("Error getting secret", JSON.stringify(error))
        process.exit(1);
    }
    return secret
}