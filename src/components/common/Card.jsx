import { motion } from 'framer-motion';

export default function Card({ children, className = "", style }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className={`glass-card ${className}`}
            style={style}
        >
            {children}
        </motion.div>
    );
}