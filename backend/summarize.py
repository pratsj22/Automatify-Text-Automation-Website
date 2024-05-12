import numpy as np
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from sklearn.metrics.pairwise import cosine_similarity
from gensim.models import Word2Vec
nltk.download('punkt')

def preprocess_text(text):
    sentences = sent_tokenize(text)
    words = [word_tokenize(sentence.lower()) for sentence in sentences]
    return words, sentences

def generate_summary(text, summary_percentage=0.2):
    words, sentences = preprocess_text(text)
    
    word2vec_model = Word2Vec(words, min_count=1)
    sentence_embeddings = []
    for sentence in words:
        vector_sum = np.zeros(word2vec_model.vector_size)
        num_words = 0
        for word in sentence:
            if word in word2vec_model.wv:
                vector_sum += word2vec_model.wv[word]
                num_words += 1
        if num_words > 0:
            sentence_embeddings.append(vector_sum / num_words)
        else:
            sentence_embeddings.append(np.zeros(word2vec_model.vector_size))
    
    sentence_embeddings = np.array(sentence_embeddings)
    similarity_matrix = cosine_similarity(sentence_embeddings, sentence_embeddings)
    # PageRank algorithm
    scores = np.ones(len(sentences))
    damping_factor = 0.85
    eps = 1e-4
    for _ in range(100):
        prev_scores = np.copy(scores)
        for i in range(len(sentences)):
            scores[i] = (1 - damping_factor) + damping_factor * np.sum(similarity_matrix[i] * scores / np.sum(similarity_matrix[i]))
        if np.linalg.norm(scores - prev_scores) < eps:
            break
    
    num_sentences = int(summary_percentage/100 * len(sentences))
    selected_indices = np.argsort(scores)[-num_sentences:]
    
    summary = ' '.join([sentences[i] for i in sorted(selected_indices)])
    
    return summary