/** @jsxImportSource react */
import type { FunctionComponent } from 'react';
import './VersionSelect.css';
import { KNOWN_VERSIONS } from '../../consts';
import { versionPathRegex } from '../../languages';

const VersionSelect: FunctionComponent<{ version: string }> = ({ version }) => {
	return (
		<div className="version-select-wrapper">
			<select
				className="version-select"
				value={version}
				onChange={(e) => {
					const newVersion = e.target.value;
					window.location.pathname = window.location.pathname.replace(versionPathRegex, newVersion.replaceAll('.', ''));
				}}
			>
				{KNOWN_VERSIONS.map((value) => {
					return (
						<option value={value} key={value}>
							{value}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default VersionSelect;
