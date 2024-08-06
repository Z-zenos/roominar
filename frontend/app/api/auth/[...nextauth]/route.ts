import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
			profile: (profile: GoogleProfile) => {
				if (profile) {
					return {
						id: profile.sub,
						email: profile.email,
						name: profile.name,
						image: profile.picture,
						given_name: profile.given_name,
						family_name: profile.family_name,
					};
				} else {
					throw new Error('Login Failed');
				}
			},
		}),
	],
	session: { strategy: 'jwt', maxAge: 1 * 24 * 60 * 60 },
	callbacks: {
		jwt: async ({ token, user, profile }) => {
			// initial sign in
			if (user) {
				token.name = user.name;
				token.picture = user.image;
				token.firstName = (profile as GoogleProfile).given_name;
				token.lastName = (profile as GoogleProfile).family_name;
				token.email = profile?.email;

				return token;
			}

			return token;
		},
		session: async ({ session, token }) => {
			session.user = {
				name: token.name,
				email: token.email,
				image: token.picture,
				// @ts-ignore
				firstName: token.firstName,
				lastName: token.lastName,
			};

			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
