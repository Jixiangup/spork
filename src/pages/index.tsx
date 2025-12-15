import { Button, Heading, NavList } from "@primer/react";
import { FileDirectoryIcon, PersonIcon, RepoIcon } from '@primer/octicons-react';
import { Link } from "@/router.ts";

/**
 * Application entry point
 *
 * @author jixiangup
 * @since 1.0.0
 */
const App = () => {
	return (
		<div>
			<div className='markdown-body'>
				<h2>Your markdown content</h2>
				<p>This will be styled like GitHub markdown</p>
			</div>
			<Heading as="h2">Hello, world!</Heading>
			<Button onClick={async () => window.location.reload()}>刷新</Button>
			<NavList>
				<NavList.Group title="Group 1">
					<NavList.Item aria-current="true" href="#">
						<NavList.LeadingVisual>
							<RepoIcon />
						</NavList.LeadingVisual>
						Item 1A
					</NavList.Item>
					<NavList.Item href="#">
						<NavList.LeadingVisual>
							<PersonIcon />
						</NavList.LeadingVisual>
						Item 1B
					</NavList.Item>
					<NavList.Item href="#">
						<NavList.LeadingVisual>
							<FileDirectoryIcon />
						</NavList.LeadingVisual>
						Item 1C
					</NavList.Item>
				</NavList.Group>
				<NavList.Group title="Group 2">
					<NavList.Item href="#">Item 2A</NavList.Item>
					<NavList.Item href="#">Item 2B</NavList.Item>
					<NavList.Item href="#">Item 2C</NavList.Item>
				</NavList.Group>
			</NavList>
			<Link to='/about'>Go to About Page</Link>
		</div>
	);
}

export default App;
