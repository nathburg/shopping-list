const SUPABASE_URL = 'https://iiheuanoirgtlmgbnvou.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpaGV1YW5vaXJndGxtZ2Judm91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA2MTA4MjAsImV4cCI6MTk3NjE4NjgyMH0.0nFD2sYSDNfeuHIBj-7JNMLMp8hUsGMk6J90sU5381w';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    // return the user so can be used in the page if needed
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function enterListItem(listItem) {
    const response = client.from('shopping-list').insert([listItem]);
    return response;
}

export async function getListItems() {
    const response = await client.from('shopping-list').select('*');
    return response;
}

export async function changeBought(id) {
    const response = await client.from('shopping-list').update({ bought: true }).match({ 'id': id });
    return response;
}