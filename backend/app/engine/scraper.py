import os
import scrapy
from scrapy.crawler import CrawlerProcess
from googlesearch import search

class GoogleSearchSpider(scrapy.Spider):
    name = "google_search"

    def __init__(self, query, save_path, *args, **kwargs):
        super(GoogleSearchSpider, self).__init__(*args, **kwargs)
        self.query = query
        self.save_path = save_path

    def start_requests(self):
        url = f"https://www.google.com/search?q={self.query}"
        yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        results = response.css('div.tF2Cxc')
        for i, result in enumerate(results, start=1):
            url = result.css('a::attr(href)').get()
            yield response.follow(url, callback=self.parse_page, meta={'index': i})

    def parse_page(self, response):
        filename = f"{self.query}_result_{response.meta['index']}.txt"
        content = response.css('body::text').get()
        with open(os.path.join(self.save_path, filename), "w", encoding="utf-8") as file:
            file.write(content)
        self.log(f"Content of '{response.url}' saved to '{filename}'")

def get_top_10_results(query, save_path):
    try:
        process = CrawlerProcess(settings={
            'FEEDS': {},
            'LOG_LEVEL': 'INFO',
        })
        process.crawl(GoogleSearchSpider, query=query, save_path=save_path)
        process.start()
    except Exception as e:
        print("An error occurred:", str(e))

# Example usage
query = "cleartax income"
save_path = "/app/data/"
get_top_10_results(query, save_path)
