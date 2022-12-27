import styles from "./Loading.module.css";

// https://loading.io/css/
function Loading() {
  return (
    <div className={styles.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loading;
