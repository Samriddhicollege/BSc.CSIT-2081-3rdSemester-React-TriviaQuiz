import Card from './common/Card';
import { useQuiz } from '../context/QuizContext';

export default function CategorySelector({ onSelectCategory }) {
    const { questions } = useQuiz();

    const categoriesList = [...new Set(questions.map(q => q.category))];
    const categories = ["📚 All", ...categoriesList];

    return (
        <Card>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                Select a Category
            </h2>

            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Test your knowledge across {categoriesList.length} categories!
            </p>

            <div className="category-grid">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="category-card"
                        onClick={() => onSelectCategory(cat)}
                    >
                        <h3>
                            <span style={{ fontSize: '2.5rem' }}>
                                {cat.split(" ")[0]}
                            </span>
                            {" "}{cat.split(" ").slice(1).join(" ")}
                        </h3>
                    </div>
                ))}
            </div>
        </Card>
    );
}