INSERT INTO users (username, email, created_at)
SELECT 'user_' || g, 'user_' || g || '@academic-labs.local', NOW() - (random() * interval '365 days')
FROM generate_series(1, 100000) AS g;

INSERT INTO transactions (user_id, amount, description, transaction_date)
SELECT floor(random() * 100000 + 1)::int, (random() * 5000)::numeric(12,2), 'Simulated academic transaction details for record ' || g, NOW() - (random() * interval '180 days')
FROM generate_series(1, 1000000) AS g;

INSERT INTO logs (level, message, created_at)
SELECT CASE WHEN random() < 0.1 THEN 'ERROR' WHEN random() < 0.3 THEN 'WARN' ELSE 'INFO' END, 'System log record sequence: ' || g, NOW()
FROM generate_series(1, 10000) AS g;
