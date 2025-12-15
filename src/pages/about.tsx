import { Link } from "@/router.ts";

const About = () => {
	return (
		<div>
			<div>
				<h1>About Page</h1>
				<p>This is the about page of the application.</p>
			</div>
			<Link to='/'>Go to Home Page</Link>
		</div>
	);
}

export default About;