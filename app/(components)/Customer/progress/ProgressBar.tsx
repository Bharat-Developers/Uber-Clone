"use client";
import { useEffect, useRef, useState } from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = () => {
    const [currentProgress, setCurrentProgress] = useState<number>(0);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProgress((prevProgress: number) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 10; 
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const progressBar = progressBarRef.current;
        if (progressBar) {
            
        }
    }, [currentProgress]);

    return (
        <div className={styles.progressContainer}>
            <p className={styles.statusText} id='buffer'>Please wait. Finding the best driver for you</p>
            <div className={styles.progress}>
                <div
                    ref={progressBarRef}
                    className={`${styles.progressBar} ${styles.progressBarStriped} ${styles.progressBarAnimated}`}
                    role="progressbar"
                    aria-valuenow={currentProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: `${currentProgress}%` }}
                >
                    <span className={styles.progressText}>{currentProgress}% Completed</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
