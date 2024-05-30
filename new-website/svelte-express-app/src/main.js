import App from './App.svelte';
import Home from './routes/Home.svelte';
import About from './routes/About.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
// export { Home, About };