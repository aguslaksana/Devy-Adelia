import { FC } from "react";
import styles from "./loading.module.css"; // Import CSS module for styling

const Loading: FC = () => {
	return (
		<div className={styles.loading}>
			<div className={styles.spinner}></div>
		</div>
	);
};

export default Loading;
