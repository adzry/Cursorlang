"""Simple in-memory state store"""


class MemoryStore:
    """Simple in-memory key-value store for workflow state"""

    def __init__(self):
        self.store = {}

    def save(self, key: str, data: dict) -> None:
        """Save data to the store"""
        self.store[key] = data

    def load(self, key: str) -> dict:
        """Load data from the store"""
        return self.store.get(key)

    def delete(self, key: str) -> None:
        """Delete data from the store"""
        if key in self.store:
            del self.store[key]

    def clear(self) -> None:
        """Clear all data from the store"""
        self.store.clear()


# Global memory instance
memory = MemoryStore()
