import fetch from 'node-fetch';

export interface MastodonApp {
  id: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

export interface MastodonToken {
  access_token: string;
  token_type: string;
  scope: string;
  created_at: number;
}

export interface MastodonAccount {
  id: string;
  username: string;
  acct: string;
  url: string;
  display_name: string;
}

export interface MastodonStatus {
  id: string;
  uri: string;
  url: string;
  content: string;
  created_at: string;
}

export class MastodonClient {
  private instance: string;
  private clientId?: string;
  private clientSecret?: string;
  private redirectUri?: string;
  private accessToken?: string;

  constructor(instance: string, accessToken?: string) {
    this.instance = instance;
    this.accessToken = accessToken;
  }

  private getApiUrl(path: string): string {
    return `https://${this.instance}${path.startsWith('/') ? path : '/' + path}`;
  }

  async createApp(redirectDomain: string): Promise<MastodonApp> {
    const redirectUri = `https://${redirectDomain}/api/auth/callback`;
    
    const response = await fetch(this.getApiUrl('/api/v1/apps'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_name: 'Wird - Quran Verse Poster',
        redirect_uris: redirectUri,
        scopes: 'read write',
        website: `https://${redirectDomain}`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create Mastodon app: ${response.status} ${errorText}`);
    }

    const app = await response.json() as MastodonApp;
    this.clientId = app.client_id;
    this.clientSecret = app.client_secret;
    this.redirectUri = redirectUri;
    
    return app;
  }

  getAuthorizationUrl(clientId: string, redirectUri: string): string {
    try {
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'read write',
      });
      
      return this.getApiUrl(`/oauth/authorize?${params.toString()}`);
    } catch (error) {
      console.error('Error generating authorization URL:', error);
      throw error;
    }
  }

  async getAccessToken(clientId: string, clientSecret: string, redirectUri: string, code: string): Promise<MastodonToken> {
    const response = await fetch(this.getApiUrl('/oauth/token'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        code,
        scope: 'read write',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get access token: ${response.status} ${errorText}`);
    }

    const token = await response.json() as MastodonToken;
    this.accessToken = token.access_token;
    
    return token;
  }

  async verifyCredentials(): Promise<MastodonAccount> {
    if (!this.accessToken) {
      throw new Error('Access token not set');
    }

    const response = await fetch(this.getApiUrl('/api/v1/accounts/verify_credentials'), {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to verify credentials: ${response.status} ${errorText}`);
    }

    return response.json() as Promise<MastodonAccount>;
  }

  async postStatus(status: string): Promise<MastodonStatus> {
    if (!this.accessToken) {
      throw new Error('Access token not set');
    }

    const response = await fetch(this.getApiUrl('/api/v1/statuses'), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        visibility: 'public',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to post status: ${response.status} ${errorText}`);
    }

    return response.json() as Promise<MastodonStatus>;
  }
}
